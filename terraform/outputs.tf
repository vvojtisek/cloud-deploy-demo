output "ecr_repository_url" {
  value = aws_ecr_repository.repo.repository_url
}

output "alb_dns_name" {
  value = aws_lb.app.dns_name
}

output "github_actions_role_arn" {
  value = aws_iam_role.github_actions.arn
}

output "vpc_id" {
  value = aws_vpc.main.id
}

output "subnet_ids" {
  value = aws_subnet.public[*].id
}
