# telegram-mcp

A minimal MCP (Model Context Protocol) server that lets an MCP client (e.g.
Claude Code) send and read Telegram messages through a Telegram bot.

## Tools

- `telegram_get_me` — verify the bot token and see the bot's username.
- `telegram_send_message` — send a text message to a chat_id or `@username`.
- `telegram_get_updates` — read messages/events sent to the bot.

## Setup

1. **Create a bot**: message [@BotFather](https://t.me/BotFather) in
   Telegram, run `/newbot`, and follow the prompts. You'll receive a bot
   token that looks like `123456789:AAExampleTokenDoNotShare`.

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Set the token** as an environment variable (never commit it or paste it
   into chat/code):
   ```bash
   export TELEGRAM_BOT_TOKEN="your-token-here"
   ```

4. **Register the server** with your MCP client. For Claude Code, add to
   `.mcp.json` (or your user-level MCP config):
   ```json
   {
     "mcpServers": {
       "telegram": {
         "command": "python",
         "args": ["telegram-mcp/server.py"],
         "env": {
           "TELEGRAM_BOT_TOKEN": "your-token-here"
         }
       }
     }
   }
   ```
   Prefer referencing the token from your shell environment rather than
   writing it into a checked-in config file.

## Finding a chat_id

Telegram bots can't message a user until that user has messaged the bot
first. To message someone:
1. Have them open your bot in Telegram (`t.me/<bot_username>`, from
   `telegram_get_me`) and send it any message.
2. Call `telegram_get_updates` — the message will include their `chat.id`.
3. Use that `chat_id` with `telegram_send_message`.

## Notes

- This is intentionally minimal (3 tools) rather than a full wrapper of the
  Telegram Bot API — enough to send/receive messages from Claude Code.
- Treat the bot token as a secret: anyone with it can send messages as your
  bot. If it's ever exposed, revoke it via `/revoke` in @BotFather.
