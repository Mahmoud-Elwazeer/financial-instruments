#!/bin/sh

if [ "$SILENT_MODE" = "true" ]; then
    echo "Silent mode enabled. Logs are suppressed."
    exec nginx -g "daemon off;" > /dev/null 2>&1
else
    exec nginx -g "daemon off;"
fi
