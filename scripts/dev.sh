#!/bin/bash

pnpm concurrently \
    "pnpm -C apps/example dev" \
    "pnpm watch"
