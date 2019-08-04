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
  aws configure set preview.cloudfront true
  aws s3 sync ${artifacts} s3://${BUCKET} --delete --region "${REGION}" --cache-control max-age=31104000
  aws cloudfront create-invalidation --distribution-id ${AWS_DISTRIBUTION_ID} --path /*
fi
