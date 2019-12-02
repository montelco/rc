#Rowan College 
```
Version 2.0.1
Last Updated: December 2, 2019
Created by: Cory Monteleone
```

##Documentation Navigation

- [Getting Started](#getting-started)
- [Steps to a Prepared Environment](#steps-to-a-prepared-environment)
- [Style Guide](#style-guide)
- [Version control](#git)
- [Review Processes](#code-reviews-and-testing)
- [File Documentation](#files)

#Getting Started

The codebase for RCSJ requires several packages which make the development process much easier. All packages and resources below have their own comprehensive documentation and the developer would benefit from reading through prior to continuing. This documentation assumes a moderate understanding of the development tools used. 

You will need to use the following resources to prepare your development environment (this documentation assumes a Windows development box, so some steps may not be required on Mac):

- [Sublime Text 3](https://www.sublimetext.com/3)
- [Git Bash](https://git-scm.com/download/win)
- [NodeJS](https://nodejs.org/en/)

##Steps to a Prepared Environment
1. The developer should install Sublime Text 3. The default installation is powerful, but can be improved later.
2. The developer should then proceed to install the Git Bash utility. Ideally, the developer should choose to have Git use the included CLI with the MINGW64 wrapper.
3. After the installation is complete for the Git Bash terminal, run the installer for NodeJS.
4. [Clone the repository](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) and [change the terminal working directory](https://www.git-tower.com/learn/git/ebook/en/command-line/appendix/command-line-101) to the location where the repository is housed.

#Style Guide
There are always exceptions to the rules, particularly when dealing with code from outside sources such as that which the CMS requires or any other third party service. Original code, however, should follow the below **as often as possible.**

##Stylesheets
Guidelines are adapted from __[Airbnb's styleguide](https://github.com/airbnb/css/blob/master/README.md)__. Atomic CSS conventions are followed for things like alignment, spacing, color, etc. You can [read more about Atomic CSS here](https://acss.io/quick-start.html). Generally speaking, a developer should follow BEM when there are elements that depend on the Block and have modifiers. You can read more about BEM [here](http://getbem.com/). If a DOM element has more than five classes applied to it, it is generally accepted that BEM should be used.

###SASS
In general, we use SASS to make the code more maintainable and single-purpose in each file. For a reference on how to use SASS, try this [cheat sheet](https://devhints.io/sass) or the [official documentation](https://sass-lang.com/guide).

When using Atomic CSS, features of SASS such as functions should often be used to keep your code [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself). Globally, you are also encouraged to use mixins, variables, and maps for commonly repeated objects or snippets throughout in the interest of DRY code.

When naming selectors, classes, IDs, etc, the preference is for dashes over camelCasing. This is more stylistically consistent with BEM while being distinct enough to tell when an object is BEM or not.

In Sublime, spacing should be set to using spaces over tabs. General spacing for the SASS, SCSS, and CSS languages is widely accepted as 2-spaces per level of indentation and this codebase is no exception.

Generally speaking, do not use ID selectors as these have a tendency to override cascades. There are some exceptions where this may be of use, but avoid it if possible.

When using multiple selectors in a rule declaration, give each selector its own line. This is to ensure that your code is readable. Put a space before the opening brace `{` in rule declarations. In the properties, put a space after, but not before, the : character. Put closing braces `}` of rule declarations on a new line and put blank lines between rule declarations.

###Naming Conventions
The main SCSS file will be called `raw.scss` and any dependencies/extensions of `raw` will be named for clarity of purpose or scope. For instance, `_search.scss` should not include references that affect the footer in any way, likewise, `_typography.scss` should not have references to spacing unless such spacing is directly implicated in typography (eg: line-height.) Any SASS mixins will be nested in in the `mixins` folder, following standard naming conventions above, Likewise, any functions will be in a folder named `functions`. The structure of the folders will include a master file whose name will mirror the folder name. For instance, `mixins` will have an extension file named `_mixins.scss`. In this file, `_mixins.scss` contains only `@require 'other-files-in-this-directory'` as needed.

##JavaScript
All Javascript in a document should have a `deferred` attribute to offload payloads. This allows the critical request chain to complete before loading in additional features. [Wes Bos](https://wesbos.com/es6-for-everyone/) has an excellent guide on the ES6 standards.

###WebPack
All JavaScript is bundled using [WebPack](https://webpack.js.org/concepts/). This allows the code to be more functional and modular as changes occur.

#Git
##Version Control Management

All current RCSJ code is build using version control via Git. Git allows multiple developers to simulaneously handle projects while preventing collisions. There are hundred of guides on Git, so this documentation will make no attempt to be a complete resource for learning it. However, there are some general tips to making the development process proceed more easily.

##Branching
__Never work in `master`__. This cannot be stressed enough. The only things that should occur on master are merges, pulls, and pushes. You should, instead, use working directories to ensure that your code is sandboxed from that of the master source.

###Working Directory Branches
Working directories should be formatted as `wd-[date]-[developer]`. An example of this would be `wd-12312000-jsmith`. *These branches are for general use, but project specific code may have its own format.*

###Project Branches
For instance, if you are working on the search functionality, you may have a branch called `search-new-feature`. 

###Ticket or PR Branches
If you are working on a fix that originates from a Pull Request or a Ticket, you should format the branch name as `[pr|tix]-[#########]-[s|p|i]-[desc]` where the first field is the respective originating source, the numbers are the PR number or the Ticket ID, the `s` is used for Structural changes in markup; the `p` is used for changes in Presentation styles; and `i` is used for Interactives like scripts, and the description is a one-worder to identify the scope. For instance, Ticket 6502516 comes in about a broken menu action on Edge. After diagnosing the problem as being related to JavaScript, the developer would make a branch named `tix-6502516-i-menu`.

##Commits
Generally speaking, commits should occur every two hours or whenever there is a need for a stable restore point. This will help when diagnosing introduction of a bug.

When committing code, code should have frequent comments. Commits and code comments both should have adequate clarity for all developers. Commmits should be on the working branch and should not be merged into master until they have been sufficiently tested to be free of breaking changes. Branches should be pruned and cleaned regularly. When projects are completed, their branches should be deleted to keep the tree clean and clear.

#Code Reviews and Testing

Code that is placed inside any number of Rowan College products needs to be tested via components.

The first and primary check that should be done is a ful unit test.

Second, run a [Lighthouse Audit](https://developers.google.com/web/tools/lighthouse/). The Lighthouse testing suite provided by Google allows a developer to do critical checks to ensure that the experience is consistently good regardless of the device being used. Lighthouse performs several critical checks: that secure protocols are being used on all requests, that no script vulnerabilities exist, that code is not errantly being run when not needed, that mobile users have a fast experience, that technologies like HTTP/2, GZIP, caching, service workers, and other performance enhancing technologies are being used to deliver a better experience.

Third, check for [accessibility](https://wave.webaim.org/). *It is good to always keep [up-to-date on W3 best practices](https://www.w3.org/standards/webdesign/accessibility) as 100% pass does not mean that the experience for an exceptional user is enjoyable; 100% pass means that a product is acceptable, not enjoyable.*

Third, a comprehensive browser test should be conducted. Testing suite browsers like [Blisk Testing Browser](https://blisk.io/download) give a good idea for how something __may__ look once complete, but the best check is using that device or browser exactly. While it is not possible to check every single device, attempt to test every major browser and the most common screen sizes for phone, tablet, hybrid, latptop, desktop, etc. To check support before a test, reference [Can I Use](https://caniuse.com/) which compiles identified bugs and issues and updates the latest support for features as well as stats on the impact or global useage. To directly test features, feel free to use [Can I Use's Testing Suite](https://tests.caniuse.com/) which runs a specifications check on the browser accessing the resource.

Additionally, check browsers for newly discovered issues: [WebKit](https://bugs.webkit.org/describecomponents.cgi?product=WebKit), [Chromium Blink](https://bugs.chromium.org/p/chromium/issues/list), [FireFox](https://bugzilla.mozilla.org/describecomponents.cgi?product=Core), and [Edge](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/).

#Files

| __File Name__         | __Description (Optional)__                                                  | __Language__  |
|---------------------- |-------------------------------------------------------------------------------  |---------- |
| [`_ada.scss`](ada.html)             | Features needed for ADA compliant skip links                                    | SCSS      |
| [`_alerts.scss`](alerts.html)          | Alert banner code for site announcements                                        | SCSS      |
| [`_cards.scss`](cards.html)           | Any element with a card-style layout or banner header                           | SCSS      |
| [`_colors.scss`](colors.html)          | Atomic classes for assigning colors to items or text                            | SCSS      |
| [`_container.scss`](container.html)       | (Deprecated v0.3) file for the containing elements. Removing in v1.1            | SCSS      |
| [`_content.scss`](content.html)         | Sets basis for the content (text) areas                                         | SCSS      |
| [`_corev15.scss`](corev15.html)         | SharePoint 2013 styles imported for sandboxing                                  | SCSS      |
| [`_eqHeight.scss`](eqHeight.html)        | Adds equal height fixes for the cards and related                               | SCSS      |
| [`_evergreen.scss`](evergreen.html)       | Styles the evergreen feature content with text, etc                             | SCSS      |
| [`_fab.scss`](fab.html)             | Adds floating action button to the UX                                           | SCSS      |
| [`_flex.scss`](flex.html)            | (Deprecating in v1.1) Adds atomic utility flex class                            | SCSS      |
| [`_flyout.scss`](flyout.html)          | Flyout on the home slider customisations                                        | SCSS      |
| [`_footer.scss`](footer.html)          | Positions the social icons for the footer (Deprecating the atomic text class)   | SCSS      |
| [`_global.scss`](global.html)          | Sets bordering systems and the inheritance of the box bordering                 | SCSS      |
| [`_grid.scss`](grid.scss)            | (Deprecating in v1.1) Functions for creating grid                               | SCSS      |
| [`_lightbox.scss`](lightbox.html)        | Contains the actionable item triggered by the FAB                               | SCSS      |
| [`_lightbox.scss`](lightbox.html)        | Contains the actionable item triggered by the FAB                               | SCSS      |
| [`_links.scss`](links.html)        | Available utility classes for styling links                               | SCSS      |
| [`_navigation.scss`](navigation.html)      | Customisations to the CodyHouse/mega-site-navigation package                    | SCSS      |
| [`_padding.scss`](padding.html)         | (Deprecating in v1.1) Custom atomics and functions for padding elements         | SCSS      |
| [`_reset.scss`](reset.html)           | Adapted version of Eric Meyer's browser reset to set staging                    | SCSS      |
| [`_search.scss`](search.html)          | (Refactor in v1.1) Adds theming to the search area                              | SCSS      |
| [`_sharepoint.scss`](sharepoint.html)      | (Refactor in v1.1) Fixes broad selection in management console                  | SCSS      |
| [`_sizing.scss`](sizing.html)        | Atomic classes for text sizing                               | SCSS      |
| [`_slider.scss`](slider.html)          | (Refactor in v1.2) Import of the themepunch slider                              | SCSS      |
| [`_typography.scss`](typography.html)      | (Deprecating/Refactor v1.2) Atomic utility for type margins, size, and color    | SCSS      |
| [`_variables.scss`](variables.html)       | (Refactor v1.0) Variables for the application like breakpoints, fonts, colors   | SCSS      |
| compiled.min.css      | __DO NOT EDIT:__ Automatically compiled and minified styles for old browsers    | CSS       |
| compiled.min.css.map  | __DO NOT EDIT:__ Maps new browsers to SCSS imports                              | MAP       |
| [`raw.scss`](raw.html)              | Master file where new extensions should be imported. NO DIRECT EDITING.         | SCSS      |

#Recap

The Rowan College applications are ever-changing and dynamic, but this guide should attempt to give a sense of direction when writing code and reviewing code. Feel free to use the links in the documentation to further gain insight into particular tools or methods, as this documentation does not attempt to teach the use of the tools in any detail.

If you discover a security vulnerability within code, please send an e-mail to the Department of Web & Portal via [web@rcsj.edu](mailto:web@rcsj.edu). All security vulnerabilities will be promptly addressed.