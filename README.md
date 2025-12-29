# Charlyfive Websites

This monorepo contains the source code and infrastructure for the **Charlyfive** personal brand websites, hosted under the `charlyfive.com` domain.

## Project Structure

```
website/
├── sites/
│   ├── root/        # Gateway landing page (charlyfive.com)
│   ├── portfolio/   # ML Engineer portfolio (portfolio.charlyfive.com)
│   └── music/       # Music producer EPK (music.charlyfive.com)
├── infra/           # Terraform infrastructure (AWS S3, CloudFront, Route 53)
└── deploy.sh        # Deployment script
```

## Sites

| Site | URL | Description |
|------|-----|-------------|
| **Gateway** | [charlyfive.com](https://charlyfive.com) | Split-screen landing page directing users to Portfolio or Music sites |
| **Portfolio** | [portfolio.charlyfive.com](https://portfolio.charlyfive.com) | Machine Learning Engineer portfolio showcasing projects, certifications, and experience |
| **Music** | [music.charlyfive.com](https://music.charlyfive.com) | Electronic Music Producer EPK with releases, remixes, and social links |

## Technologies

### Frontend
- **HTML5** - Semantic structure
- **SCSS/CSS** - Styling with variables and modern design patterns
- **JavaScript** - Interactivity and animations
- **Bootstrap 5** - Grid system (Portfolio site)

### Infrastructure
- **Terraform** - Infrastructure as Code
- **AWS S3** - Static site hosting
- **AWS CloudFront** - CDN distribution
- **AWS Route 53** - DNS management

## Deployment

Deploy individual sites or all at once using the deploy script:

```bash
# Deploy individual sites
./deploy.sh root       # Gateway
./deploy.sh music      # Music EPK
./deploy.sh portfolio  # Portfolio

# Deploy all sites
./deploy.sh all
```

## Acknowledgements

The portfolio site was developed based on the course offered by **Cheetah Academy** on Udemy:

[Responsive Portfolio Website using HTML5, CSS3, JavaScript & Bootstrap5](https://www.udemy.com/course/responsive-portfolio-website-using-html5-css3-javascript-bootstrap5/)
