#!/usr/bin/env bash

set -e

basepath="${PWD}"
artifacts="${basepath}/public"

if [ -d ${artifacts} ]; then
  rm -R ${artifacts}
fi

echo "Artifacts: ${artifacts}"
echo "Branch:    ${GITHUB_REF}"
echo "Build:     ${GITHUB_RUN_NUMBER}"
echo "Region:    ${AWS_REGION}"
echo "Bucket:    ${AWS_BUCKET}"

mkdir -p ${artifacts}

node --version
node ${basepath}/src/js/build

if [ "${1}" == "deploy" ]; then
  aws configure set preview.cloudfront true
  aws s3 sync ${artifacts} s3://${AWS_BUCKET} --delete --region "${AWS_REGION}" --cache-control max-age=345600
  aws cloudfront create-invalidation --distribution-id ${AWS_DISTRIBUTION_ID} --path "/*"
fi
