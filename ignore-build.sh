#!/bin/bash
if [ "$VERCEL_ENV" == "production" ]; then
  echo "🛑 Skipping production build"
  exit 0
else
  echo "✅ Proceeding with build"
  exit 1
fi
