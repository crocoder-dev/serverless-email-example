<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<div align="center">
  <a href="https://github.com/crocoder-dev/serverless-email-example">
    <img src="images/logo.png" alt="Logo" width="256" height="256">
  </a>

<h3 align="center">Serverless Email</h3>

  <p align="center">
    How to use Amazon SES with AWS lambdas
    <br />
    <a href="https://github.com/crocoder-dev/serverless-email-example"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/crocoder-dev/serverless-email-example">View Demo</a>
    ·
    <a href="https://github.com/crocoder-dev/serverless-email-example/issues">Report Bug</a>
    ·
    <a href="https://github.com/crocoder-dev/serverless-email-example/issues">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## About The Project

![Product Name Screen Shot][product-screenshot]

This is a project for educational purposes.

* How to use Amazon EventBridge for communication between multiple AWS Lambda Applications
* How to use DynamoDB Streams to trigger AWS Lambda Functions 
* How to trace the requests through your system with AWS X-Ray


<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

* [Serverless](https://www.serverless.com/)
* [Node.js](https://nodejs.org/en/)

* [AWS Lambda](https://aws.amazon.com/lambda/)
* [Amazon DynamoDB](https://aws.amazon.com/dynamodb/)
* [Amazon EventBridge](https://aws.amazon.com/eventbridge/)
* [Amazon Simple Email Service](https://aws.amazon.com/ses/)

<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started

### Prerequisites

1. You need to have installed Node.js on your local machine.  
2. You need to have installed Serverless on your local machine.
   ```sh
   npm install -g serverless
   ```
3. You need to have an AWS account available.  
4. [Log in in the AWS & create an access key for CLI access.](https://console.aws.amazon.com/iam/home?region=eu-central-1#/security_credentials)  
5. Configure your Serverless credentials.
   ```sh
   serverless config credentials --provider provider --key key --secret secret
   ```
6. Provision an Amazon EventBridge Bus.  
7. Setup a new email in Amazon Simple Email Service.  

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/crocoder-dev/serverless-email-example.git
   ```
2. Install NPM packages in serverless-api, serverless-mail & serverless-reports folders
   ```sh
   cd serverless-api & npm install & cd..
   cd serverless-mail & npm install & cd..
   cd serverless-reports & npm install & cd..
   ```
3. Create .env files in serverless-api, serverless-mail & serverless-reports folders
   ```sh
   cd serverless-api & touch .env & cd..
   cd serverless-mail & touch .env & cd..
   cd serverless-reports & touch .env & cd..
   ```
4. Update .env file in serverless-api folder with these variables. `USERS_TABLE` & `POINTS_TABLE` will be the names of DynamoDB Tables created when serverless-api is deployed. `AUTH_TOKEN` is the value that should be put in `Authorization` header field to use the deployed API. `EVENT_BUS_ARN` is the ARN of the previously created EventBridge Bus.
   ```sh
   USERS_TABLE=*table-name*
   POINTS_TABLE=*table-name*
   EVENT_BUS_ARN=*event-bus-arn*
   AUTH_TOKEN=*auth-token*
   ```
5. Update .env file in serverless-mail folder with these variables. `SES_ARN` is the ARN of the previously setup Amazon Simple Email Service and `EMAIL` is the email address of the  `EMAIL` `EVENT_BUS_ARN` is the ARN of the previously created EventBridge Bus.
   ```sh
   SES_ARN=*sas-arn*
   EMAIL=*email-address*
   EVENT_BUS_ARN=*event-bus-arn*
   ```
5. Update .env file in serverless-reports folder with these variables.  `DATA_TABLE` will be the name of DynamoDB Table created when serverless-reports is deployed. `EVENT_BUS_ARN` is the ARN of the previously created EventBridge Bus.
   ```sh
   DATA_TABLE=*table-name*
   EVENT_BUS_ARN=*event-bus-arn*
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#top">back to top</a>)</p>

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

## Contact

David Abram - [@devabram](https://twitter.com/devabram) - david@crocoder.dev

Project Link: [https://github.com/crocoder-dev/serverless-email-example](https://github.com/crocoder-dev/serverless-email-example)

<p align="right">(<a href="#top">back to top</a>)</p>

## Acknowledgments

* [README Template taken from othneildrew/Best-README-Template](https://github.com/othneildrew/Best-README-Template/blob/master/README.md)

<p align="right">(<a href="#top">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/crocoder-dev/serverless-email-example.svg?style=for-the-badge
[contributors-url]: https://github.com/crocoder-dev/serverless-email-example/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/crocoder-dev/serverless-email-example.svg?style=for-the-badge
[forks-url]: https://github.com/crocoder-dev/serverless-email-example/network/members
[stars-shield]: https://img.shields.io/github/stars/crocoder-dev/serverless-email-example.svg?style=for-the-badge
[stars-url]: https://github.com/crocoder-dev/serverless-email-example/stargazers
[issues-shield]: https://img.shields.io/github/issues/crocoder-dev/serverless-email-example.svg?style=for-the-badge
[issues-url]: https://github.com/crocoder-dev/serverless-email-example/issues
[license-shield]: https://img.shields.io/github/license/crocoder-dev/serverless-email-example.svg?style=for-the-badge
[license-url]: https://github.com/crocoder-dev/serverless-email-example/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/david-abram
[product-screenshot]: images/architecture.png