#!/bin/bash

pnpm nx run-many --target=build --exclude="@choo-js/choo" --parallel="$(nproc)"
