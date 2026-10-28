# evilolive.com

Alex Perrault's portfolio site. Built with Jekyll and hosted on GitHub Pages.

## Where things live

| To change | Edit |
|---|---|
| Headline, intros, About bio | `_data/copy.yml` |
| A film (title, role, runtime, tags, description) | `_films/<film>.md` |
| Which films are Featured, and their order | the `featured:` number in each film file |
| Film at the top of the home page | `home_hero_film` in `_data/copy.yml` |
| Client logos | `_data/clients.yml` plus the logo file in `assets/img/logos/` |
| Tools | `_data/tools.yml` |
| Booking link, social links | `links:` in `_config.yml` |
| Colors and layout | `assets/css/site.css` |

## Adding a film

Copy any file in `_films/`, rename it (the file name becomes the web address, e.g. `/work/my-film/`), and change the fields. Add a 1280x720 thumbnail at `assets/img/films/<same name>.jpg`.

## Before launch

In `_config.yml`, set `url: https://evilolive.com` and `noindex: false`, and add a `CNAME` file containing `evilolive.com`.
