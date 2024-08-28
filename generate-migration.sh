#!/bin/bash
yarn typeorm migration:generate ./src/migrations/"$1"