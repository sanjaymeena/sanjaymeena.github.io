# Seeking Wisdom - Personal Blog

Personal blog and portfolio site for Sanjay Meena at [sanjaymeena.io](https://sanjaymeena.io).

## 🚀 Quick Start

### Prerequisites

- Ruby 3.3.x (managed via rbenv)
- Bundler

### Local Development

```bash
# Navigate to project
cd /Users/sanjaymeena/Documents/workspace/sanjaymeena.github.io

# Use correct Ruby version
rbenv local 3.3.0
eval "$(rbenv init -)"

# Install dependencies
bundle install

# Start local server
bundle exec jekyll serve
```

Site will be available at **http://127.0.0.1:4000**

### Live Reload (optional)

```bash
bundle exec jekyll serve --livereload
```

## 📁 Project Structure

```
├── _config.yml          # Site configuration
├── _data/               # Navigation and UI text
├── _includes/           # Reusable HTML components
│   └── footer/
│       └── custom.html  # Custom footer content (Developer Tools links)
├── _layouts/            # Page templates
├── _pages/              # Static pages (about, portfolio, etc.)
├── _posts/              # Blog posts organized by category
│   ├── book_notes/
│   ├── investment_notes/
│   ├── misc/
│   ├── projects/
│   └── tech/
├── assets/
│   ├── _scss/           # Stylesheets
│   ├── css/             # Compiled CSS
│   └── js/              # JavaScript
├── images/              # Image assets
└── drafts/              # Draft posts (not published)
```

## ✍️ Creating New Posts

Create a new file in the appropriate `_posts/` subdirectory:

```
_posts/tech/_posts/YYYY-MM-DD-title-of-post.md
```

### Post Front Matter Template

```yaml
---
title: "Your Post Title"
date: YYYY-MM-DD
categories:
  - tech  # or: book_notes, investment_notes, misc, projects
tags:
  - tag1
  - tag2
excerpt: "Brief description of the post"
---

Your content here...
```

## 🔗 Related Sites

- **Main Site**: [sanjaymeena.io](https://sanjaymeena.io)
- **Developer Tools**: [tools.sanjaymeena.io](https://tools.sanjaymeena.io)

## 🛠️ Customization

### Footer Links

Edit `_includes/footer/custom.html` to modify footer content.

### Styling

SCSS files are in `assets/_scss/`. Main customizations:
- `_variables.scss` - Colors, fonts, sizes
- `_footer.scss` - Footer styling

### Site Settings

All site settings are in `_config.yml`. **Remember**: Changes to `_config.yml` require restarting the Jekyll server.

## 📦 Deployment

Site is deployed via GitHub Pages. Push to `master` branch to deploy:

```bash
git add .
git commit -m "Your commit message"
git push origin master
```

## 🐛 Troubleshooting

### Ruby Version Issues

```bash
# Check current Ruby version
ruby --version

# Switch to correct version
rbenv local 3.3.0
eval "$(rbenv init -)"
```

### Bundle Install Errors

```bash
# Clear and reinstall
rm -rf vendor/bundle Gemfile.lock
bundle install
```

### Jekyll Serve Errors

```bash
# Kill any existing Jekyll processes
pkill -f jekyll

# Restart
bundle exec jekyll serve
```

## 📄 License

Content © Sanjay Meena. Theme based on [Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes).
