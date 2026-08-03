#!/usr/bin/env python3
"""MCP server for the Telegram Bot API.

Exposes a small set of tools so an MCP client (e.g. Claude Code) can send
messages through a Telegram bot and read messages sent to it.

Requires a bot token from @BotFather in Telegram, passed via the
TELEGRAM_BOT_TOKEN environment variable (never hardcode it here).
"""

import os
from typing import Optional

import httpx
from pydantic import BaseModel, ConfigDict, Field
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("telegram_mcp")

TELEGRAM_API_BASE = "https://api.telegram.org"


def _get_token() -> str:
    token = os.environ.get("TELEGRAM_BOT_TOKEN")
    if not token:
        raise RuntimeError(
            "TELEGRAM_BOT_TOKEN environment variable is not set. "
            "Create a bot with @BotFather in Telegram and set the token "
            "before starting this server."
        )
    return token


async def _call_telegram(method: str, **params) -> dict:
    """Call a Telegram Bot API method and return its 'result' field."""
    token = _get_token()
    url = f"{TELEGRAM_API_BASE}/bot{token}/{method}"
    async with httpx.AsyncClient() as client:
        response = await client.post(url, json=params, timeout=30.0)
    data = response.json()
    if not data.get("ok"):
        description = data.get("description", "Unknown error")
        raise RuntimeError(f"Telegram API error: {description}")
    return data["result"]


def _handle_error(e: Exception) -> str:
    if isinstance(e, RuntimeError):
        return f"Error: {e}"
    if isinstance(e, httpx.TimeoutException):
        return "Error: Request to Telegram timed out. Please try again."
    if isinstance(e, httpx.HTTPStatusError):
        return f"Error: Telegram API request failed with status {e.response.status_code}"
    return f"Error: Unexpected error occurred: {type(e).__name__}: {e}"


class SendMessageInput(BaseModel):
    """Input model for sending a Telegram message."""

    model_config = ConfigDict(str_strip_whitespace=True, extra="forbid")

    chat_id: str = Field(
        ...,
        description=(
            "Target chat ID or @username of the recipient. "
            "For a private chat, this is the numeric user ID "
            "(get it from telegram_get_updates after the user has messaged the bot). "
            "For a public channel it can be '@channelusername'."
        ),
        min_length=1,
    )
    text: str = Field(
        ...,
        description="Message text to send (up to 4096 characters).",
        min_length=1,
        max_length=4096,
    )


class GetUpdatesInput(BaseModel):
    """Input model for fetching incoming Telegram updates."""

    model_config = ConfigDict(extra="forbid")

    offset: Optional[int] = Field(
        default=None,
        description=(
            "Identifier of the first update to return. Pass the last received "
            "update's update_id + 1 to only fetch new updates and mark earlier "
            "ones as read. Omit to fetch from the oldest pending update."
        ),
    )
    limit: int = Field(
        default=20,
        description="Maximum number of updates to return.",
        ge=1,
        le=100,
    )


@mcp.tool(
    name="telegram_get_me",
    annotations={
        "title": "Get Telegram Bot Info",
        "readOnlyHint": True,
        "destructiveHint": False,
        "idempotentHint": True,
        "openWorldHint": True,
    },
)
async def telegram_get_me() -> str:
    """Get information about the bot associated with TELEGRAM_BOT_TOKEN.

    Use this to verify the bot token is valid and to see the bot's username,
    which people need to know to start a chat with it in Telegram.

    Returns:
        str: JSON-formatted bot info (id, username, first_name, capability
        flags), or "Error: <message>" if the token is missing/invalid.
    """
    try:
        import json

        result = await _call_telegram("getMe")
        return json.dumps(result, indent=2)
    except Exception as e:
        return _handle_error(e)


@mcp.tool(
    name="telegram_send_message",
    annotations={
        "title": "Send Telegram Message",
        "readOnlyHint": False,
        "destructiveHint": False,
        "idempotentHint": False,
        "openWorldHint": True,
    },
)
async def telegram_send_message(params: SendMessageInput) -> str:
    """Send a text message from the bot to a Telegram chat.

    The recipient must have started a conversation with the bot first (or the
    chat_id must be a channel/group the bot has been added to) — Telegram
    bots cannot message arbitrary users who haven't opted in.

    Args:
        params (SendMessageInput): Validated input containing:
            - chat_id (str): Target chat ID or @username
            - text (str): Message text, up to 4096 characters

    Returns:
        str: JSON-formatted info about the sent message (message_id, chat,
        date, text) on success, or "Error: <message>" on failure — e.g. if
        the chat_id is unknown to the bot or the bot was blocked by the user.
    """
    try:
        import json

        result = await _call_telegram(
            "sendMessage", chat_id=params.chat_id, text=params.text
        )
        return json.dumps(result, indent=2)
    except Exception as e:
        return _handle_error(e)


@mcp.tool(
    name="telegram_get_updates",
    annotations={
        "title": "Get Telegram Updates",
        "readOnlyHint": True,
        "destructiveHint": False,
        "idempotentHint": False,
        "openWorldHint": True,
    },
)
async def telegram_get_updates(params: GetUpdatesInput) -> str:
    """Fetch incoming messages and other events sent to the bot.

    Uses Telegram's long-polling getUpdates method. This is how you discover
    a user's chat_id: ask them to send any message to the bot, then call this
    tool to see it. Calling with an offset past the last update_id marks
    earlier updates as read so they won't be returned again.

    Args:
        params (GetUpdatesInput): Validated input containing:
            - offset (Optional[int]): First update_id to return (see docstring above)
            - limit (int): Maximum updates to return, between 1-100 (default 20)

    Returns:
        str: JSON-formatted list of updates (each with update_id and, for
        messages, the sender's chat id/name and text), or "No new updates."
        if there are none, or "Error: <message>" on failure.
    """
    try:
        import json

        kwargs = {"limit": params.limit}
        if params.offset is not None:
            kwargs["offset"] = params.offset
        result = await _call_telegram("getUpdates", **kwargs)
        if not result:
            return "No new updates."
        return json.dumps(result, indent=2)
    except Exception as e:
        return _handle_error(e)


if __name__ == "__main__":
    mcp.run()
