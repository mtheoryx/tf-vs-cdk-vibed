# Terraform vs CDK Infrastructure Comparison

A comprehensive comparison of AWS CDK and Terraform for building and managing cloud infrastructure, using a real-world N-tier blog architecture as the test case.

## Project Overview

This project implements the same N-tier blog architecture using both Terraform and AWS CDK, allowing for a detailed comparison of:
- Developer experience and ergonomics
- Infrastructure as Code capabilities
- Cost management and optimization
- Platform portability and migration strategies

## Project Structure

- `tf/` - Terraform implementations for all deployment phases
- `cdk/` - AWS CDK implementations for all deployment phases
- `local-development/` - Complete Docker-based local testing environment
- `presentation/` - Materials for talks and demonstrations
- `engineer-notes.md` - Strategic vision and requirements
- `assistant-progress.md` - AI assistant progress tracking

## Local Development

Before deploying to AWS, you can test the complete N-tier architecture locally:

```bash
cd local-development
docker-compose up -d
```

This provides a cost-free way to validate your architecture and generate test content before cloud deployment.

## Deployment Phases

1. **Traditional N-Tier**: VPC + EC2 + Aurora PostgreSQL
2. **Managed Services**: Lightsail/Beanstalk migration
3. **High Availability**: Multi-AZ resilience testing
4. **Modern Serverless**: Static site + SSR architecture

## Goals

- Prove that developers can own their content regardless of hosting platform
- Demonstrate transparent cost management across different architectures
- Enable platform migration within one week
- Compare Terraform vs CDK developer experience
- Generate reusable code examples for presentations

## Getting Started

1. **Local Testing**: Start with `local-development/` to test the architecture
2. **Infrastructure**: Choose `tf/` or `cdk/` for cloud deployment
3. **Documentation**: Review `engineer-notes.md` for strategic context
4. **Progress**: Check `assistant-progress.md` for implementation status
