## Setup

Ensure you have the following gems in your Rails `Gemfile`

```ruby
# Gemfile
gem 'bootstrap-sass'
gem 'font-awesome-sass'
gem 'simple_form'
```

Then in your terminal, in the rails app root.

```bash
$ bundle install
$ rails generate simple_form:install --bootstrap
$ rm -rf app/assets/stylesheets
$ curl -L https://github.com/lewagon/stylesheets/archive/master.zip > stylesheets.zip
$ unzip stylesheets.zip -d app/assets && rm stylesheets.zip && mv app/assets/rails-stylesheets-master app/assets/stylesheets
```

Don't forget the sprockets directives in `assets/application.js`

```javascript
// app/assets/javascripts/application.js

//= require jquery
//= require jquery_ujs
//= require bootstrap-sprockets
//= require_tree .
```

And the viewport in the layout

```html
<!-- app/views/layouts/application.html.erb -->
<head>
  <!-- Add these line for detecting device width -->
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
</head>
```

## Adding new `.scss` files

Look at your main `application.scss` file to see how SASS files are imported.

```scss
// Graphical variables
@import "config/variables";
@import "config/bootstrap_variables";

// External libraries
@import "bootstrap";
@import "font-awesome-sprockets";
@import "font-awesome";

// Your CSS
@import "layout/index";
@import "components/index";
@import "pages/index";
@import "vendor/index";
```

For every folder (**`components`**, **`layout`**, **`pages`**, **`vendor`**), there is one `_index.scss` partial which is responsible for importing all the other partials of its folder.
