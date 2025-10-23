# Engineer Notes

## Important Considerations!

- I will be using my employers sandbox account for this
- This is created for me to use for experiments
- I have full admin rights on this account, but I don't want to rely on that
- I want to know the full costs of things we are going to deploy
- I want to immediately delete any resources that I see might be incurring unexpected costs

## Minimum Requirements

### AWS Account with a VPC and a n-tier application

- We will use an IGW in a VPC that is not the Default VPC
- We will use an NGINX reverse-proxy hosted on EC2 in a public subnet
- We will then foward traffic to a private subnet that hosts some kind of CMS
- That database source will be hosted in yet another private subnet that uses some relational DB source such as Aurora postgres
- WordPress may seem like an easy choice for testing here, but I want to find others since I will never let WordPress be my eventual solution for this personal experiment


### We will then migrate to managed services

- We can look at moving to managed services like Lightsail, Beanstalk, or something else
- This should raise the abstraction to some degree
- We should perform some metrics on two categories: Performance of the blog, and efficiency and ergonomics of the developer and publisher

### We will deploy this as a highly available, resilliant fashion

- We will ensure we can deploy this across at least two Availability Zones
- We will design scenarios to force failover from one host to another
- We will exercise full recovery from failure, including data

### We will redesign the CMS to run in a native, resillient, global fashion

- We will choose a tech stack that does not depend on relational data
- We will deploy a static site, that is also server-rendered
- We will then test performance of this site for end users
- We will then test the efficiency of a devloper, publisher, or editor who is updating content
- We will then evaluate whether it makes sense to go with the former EC2 or Lightsail or Beanstalk option, or the more modern serverless, static site option.

## This is the experiment of my lifetime

- There are too many people arguing about cloud vs self-hosting vs colo
- Every single person should own their content, regardless of where it's served from
- Everyone should know what thier hosting should cost them
- Everyone should be able to move their platform to another host within a week

## My goal with this

- I want to show that an old dev who has recently jumped back into actual techology can remember and be great
- I want to show that the only way to measure is to test; hence testing the various kinds of deployments
- I want to have enough usable code examples from this that I can travel and give talks on behalf of me and my company
- I want to do this for both Terraform and CDK, so I can compare and contrast the two IAC solutions