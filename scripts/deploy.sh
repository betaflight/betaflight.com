aws s3 sync "${TRAVIS_BUILD_DIR}/public" s3://${BUCKET} --delete --region=${REGION}
# version of client tools not yet setup for this... 
#aws configure set preview.cloudsearch true
#aws cloudfront create-invalidation --distribution-id ${AWS_DISTRIBUTION_ID} --paths "/*"
