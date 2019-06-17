#!/bin/sh

set -e

## libelf1 is needed to run flow
apt-get update -qq
apt-get install -qy libelf1

yarn install --no-progress
yarn flow
yarn lint
yarn test
