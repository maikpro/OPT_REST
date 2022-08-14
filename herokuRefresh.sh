#!/bin/bash
heroku plugins:install heroku-builds
heroku builds:cancel
heroku restart