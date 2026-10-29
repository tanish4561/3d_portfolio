#!/usr/bin/env bash
set -e

if [ -z "${SURGE_TOKEN:-}" ]; then
  echo "SURGE_TOKEN must be set before deploying." >&2
  exit 1
fi

npx --yes surge ./prod-bundle tanish-portfolio-botanic.surge.sh --token "$SURGE_TOKEN"
