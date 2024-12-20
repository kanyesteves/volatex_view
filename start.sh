#!/bin/bash
sed -i "s/-/$BACKEND_PORT/" .env
npx serve -s dist