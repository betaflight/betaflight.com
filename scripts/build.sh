#!/usr/bin/env bash

set -e

basepath="${PWD}"
artifacts="${basepath}/public"

if [ -d ${artifacts} ]; then
  rm -R ${artifacts}
fi

echo "Artifacts: ${artifacts}"
echo "Branch:    ${TRAVIS_BRANCH}"
echo "Build:     ${TRAVIS_BUILD_NUMBER}"
echo "Region:    ${REGION}"
echo "Bucket:    ${BUCKET}"

mkdir -p ${artifacts}

node --version
node ${basepath}/node_modules/nanogen/lib/cli build

if [ "${1}" == "deploy" ]; then
  aws s3 sync ${artifacts} s3://${BUCKET} --delete --region "${REGION}"
fi
