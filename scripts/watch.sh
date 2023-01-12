#!/bin/bash

pnpm nx watch --all --verbose -- nx run \$NX_PROJECT_NAME:build
