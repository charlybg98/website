output "content_buckets" {
  value = { for k, v in aws_s3_bucket.content : k => v.bucket }
}

output "cloudfront_domains" {
  value = { for k, v in aws_cloudfront_distribution.content : k => v.domain_name }
}

output "www_redirect_bucket" {
  value = aws_s3_bucket.www.bucket
}
