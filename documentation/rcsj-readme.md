#Rowan College Website Documentation
```
Version 0.9.1
Last Updated: September 14, 2018
Created by: Cory Monteleone
```
***
##Documentation Navigation

- [Setup](#setup)
- [Steps to a Prepared Environment](#steps-to-a-prepared-environment)
- [Style Guide](#style-guide)
- [Version control management](#git)
- [Code Paradigms](#paradigms)
- [Review Processes](#reviews)
- [File Documentation](#files)

#Setup

The codebase for the Rowan College site requires several packages which make the development process much easier. Using technology that promotes better practices makes better code conformity and better development cycles. All pacakages and resources below have their own comprehensive documentation and the developer would benefit from reading through as this documentation assumes a moderate understanding of the stack tools used. You will need to use the following resources to prepare your development environment (this documentation assumes a Windows development box, so some steps may not be required on Mac):

- [Sublime Text 3](https://www.sublimetext.com/3)
- [Git Bash](https://git-scm.com/download/win)
- [SASS Compiler](https://sass-lang.com/install)
- [Blisk Testing Browser](https://blisk.io/download)
- [Firefox Developer](https://www.mozilla.org/en-US/firefox/developer/)  

   __And these Sublime packages__:  
  - [Package Control](https://packagecontrol.io/installation)  
  - [PC:IP SASS](https://packagecontrol.io/packages/Sass)  
  - [PC:IP Git](https://packagecontrol.io/packages/Git)  
  - [PC:IP Color Highlighter](https://packagecontrol.io/packages/Color%20Highlighter)  
  - [SASS Linter](https://github.com/skovhus/SublimeLinter-contrib-sass-lint)  
  - [Emmet](https://github.com/sergeche/emmet-sublime#readme)  

##Steps to a Prepared Environment
1. The developer should install Sublime Text 3. The default installation is powerful, but can be improved later.
2. The developer should then proceed to install the Git Bash utility. Ideally, the developer should choose to have Git use the included CLI with the MINGW64 wrapper.
3. After the installation is complete for the Git Bash terminal, the developer will benefit from installing SASS on the device. This will allow for later integration with testing tools and linters.
3. The development environment is almost ready but requires Sublime packages to make the process more efficient. Install the Package Control package first. Once installed and Sublime has been restarted, the developer can access Package Control by using `CTRL + SHIFT + P` to bring up the launcher dialogue and then typing `pcip` and hitting `ENTER`.
4. The developer should then install the Sublime packages in the following order: Git, Emmet, Color Highlighter, SASS, and SASS Linter. Follow the steps that each package outlines as they are updated frequently and instructions may change.
5. Finally, the developer should install the two browsers. Firefox Developer has the best support for CSS4 Grid and has the best Javascript debugger. Blisk allows for device spoofing for testing various displays.

#Style Guide
Every developer has his or her own style, but to make the code as readable and predictable as possible, the following guidelines should be followed. There are always exceptions to the rules, particularly when dealing with code from outside sources such as that which the CMS requires or any other third party service. Original code, however, should follow the below as often as possible.

Most of the guidelines are adapted from __[Airbnb's styleguide](https://github.com/airbnb/css/blob/master/README.md)__ which has a great deal of overlap. Generally speaking, a developer should follow BEM when there are elements that depend on the Block and have modifiers. You can read more about BEM [here](http://getbem.com/).

In general, we use SASS to make the code more maintainable and single-purpose in each file. For a reference on how to use SASS, try this [cheat sheet](https://devhints.io/sass) or the [official documentation](https://sass-lang.com/guide). To learn more about the structure of a project, please refer to the Paradigms section of the documentation.

In Sublime, spacing should be set to using spaces over tabs. General spacing for the SASS, SCSS, and CSS languages is widely accepted as 2-spaces per level of indentation and this codebase is no exception.

When naming selectors, classes, IDs, etc, the preference is for dashes over camelCasing. This is more stylistically consistent with BEM while being distinct enough to tell when an object is BEM or not. In some instances, however, Atomic CSS conventions are followed for things like alignment, spacing, color, etc. You can read more about Atomic CSS [here](https://acss.io/quick-start.html), but in essence the code should be Atomic until a point. If a DOM element has more than eight classes applied to it, it is generally accepted that BEM should be used.

When using Atomic CSS, features of SASS such as functions should often be used to keep your code [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself). Globally, you are also encouraged to use mixins, variables, and maps for commonly repeated objects or snippets throughout in the interest of DRY code.

Generally speaking, do not use ID selectors as these have a tendency to override cascades. There are some exceptions where this may be of use, but avoid it if possible. When using multiple selectors in a rule declaration, give each selector its own line. This is to ensure that your code is readable. Put a space before the opening brace { in rule declarations. In the properties, put a space after, but not before, the : character. Put closing braces } of rule declarations on a new line and
put blank lines between rule declarations. Thanks to the way that SASS compiles and preprocesses the codebase, you should never feel discouraged from using comments (SASS strips these out for us to make our code lighter). Of course, all of these rules are reinforced by the use of our Linter to ensure adherence to best practices.

#Git
##Version Control Management

All current Rowan College code is build using version control via Git. Git allows multiple developers to simulaneously handle projects while preventing collisions. There are hundred of guides on Git, so this documentation will make no attempt to be a complete resource for learning it. However, there are some general tips to making the development process proceed more easily.

__Never work in `master`__. This cannot be stressed enough. The only things that should occur on master are merges, pulls, and pushes. You should, instead, use working directories to ensure that your code is sandboxed from that of the master source. Working directories should be formatted as `wd-[date]-[developer]`. An example of this would be `wd-12312000-corymont`. These branches are for general use, but project specific code may have its own format. 

For instance, if you are working on the search functionality, you may have a branch called `search-new-feature`. 

If you are working on a fix that originates from a Pull Request or a Ticket, you should format the branch name as `[pr|tix]-[#########]-[s|p|i]-[desc]` where the first field is the respective originating source, the numbers are the PR number or the Ticket ID, the `s` is used for Structural changes in markup; the `p` is used for changes in Presentation styles; and `i` is used for Interactives like scripts, and the description is a one-worder to identify the scope. For instance, Ticket 6502516 comes in about a broken menu action on Edge. After diagnosing the problem as being related to JavaScript, the developer would make a branch named `tix-6502516-i-menu`.

Generally speaking, commits should occur every two hours or whenver there is a need for a stable restore point. This will help when diagnosing introduction of a bug.

When committing code, code should have frequent comments which are in SASS format (preferring the `//` format for comments.) Commits and code comments both should have adequate clarity for all developers. Commmits should be on the working branch and should not be merged into master until they have been sufficiently tested to be free of breaking changes. Branches should be pruned and cleaned regularly. When projects are completed, their branches should be deleted to keep the tree clean and clear.

#Paradigms

The general structure of a project will be such that the presentation (SCSS) will have only one true SCSS file and the remaining being extension files. The SCSS file will be called `raw.scss` and any dependencies/extensions of `raw` will be named for clarity and for adequate sandboxing of code. For instance, `_search.scss` should not include references that affect the footer in any way, likewise, `_typography.scss` should not have any references to spacing unless such spacing is directly implicated in typography (eg: line-height.) Any SASS mixins will be nested in in the `mixins` folder, following standard naming conventions above, Likewise, any functions will be in a folder named `functions`. The structure of the folders will include a master file named to mirror its composite parts. For instance, `mixins` will have an extension file named `_mixins.scss` where `_mixins.scss` contains only `@require 'other-files-in-this-directory'` as needed. Likewise, rather than pulling in each function and each mixin into `raw`, one only needs to include the "master" file for that directory.

To ensure that code is compiled and preprocessed as it is saved, the developer should run a Git terminal window from the SCSS root directory for that project. The developer should enter the following command `sass --watch raw.scss:compiled.min.css --style=compressed`. This window should remain open for the duration of the time coding. This will allow the preprocessor to watch changes in `raw` and its required-in dependencies and then convert the code into a compressed and minified CSS file called `compiled`. Modern browsers use the source map that the preprocessor compiles to make reference to the SCSS files and older browsers that do not support the source map automatically fallback to the minified, compiled version of the code. This ensures that the code is forward and backwards compatible.

All Javascript in a document should be deferred in the structure (markup) of the code. This allows the critical request chain to complete before loading in additional features. Remember that JavaScript and anything interactive should not be doing anything that is absolutely critical to the performance of the page. Not all users have Javascript enabled and the code should [gracefully degrade](https://zurb.com/word/graceful-degradation) if such features are not present on a device. Likewise, the JavaScript will always follow the latest standards for code formatting. As of this writing, that is ES6. [Wes Bos](https://wesbos.com/es6-for-everyone/) has an excellent guide on the ES6 standards.

All structural code should follow [W3 standards](https://www.w3.org/TR/html52/) for HTML5.2 (2017). There should be no XHTML structure present unless absolutely necessary. Most modern browsers utilize features in the HTML5 specifications and for the user clarity (eg: being agnostic of the accessing device) as well as debugging and structural clarity, divs and spans should only be used as necessary. Modern browsers are fully able to understand [custom elements](https://www.html5rocks.com/en/tutorials/webcomponents/customelements/) such as `calendar` or `widget`: use them as you see fit to make content make sense at a glance. Likewise, the interaction between structural, presentational, and interactional code should be flexible enough to adapt to screen readers, printers, etc.

#Reviews

Code that is placed inside any number of Rowan College products needs to be tested for several components. It is important that code passes all of these reviews. Should any code review fail a check, a further evaluation should take place where the developer investigates the significance and impact of the issue. For instance, if the code causes an increase in load time by 10 seconds across all browsers, this is highly significant and highly impactful and therefore should be addressed immediately. However, if code implemented, for instance, causes 3MB additional RAM usage on Internet Explorer, this is minor in terms of significance and impact and may be an appropriate candidate for a future patch. Below are some more specifics on the steps to ensuring quality code is shipped in all products.

The first and primary check that should be done is a [Lighthouse Audit](https://developers.google.com/web/tools/lighthouse/). The Lighthouse testing suite provided by Google allows a developer to do critical checks to ensure that the experience is consistently good regardless of the device being used. Lighthouse performs several critical checks: that secure protocols are being used on all requests, that no script vulnerabilities exist, that code is not errantly being run when not needed, that mobile users have a fast experience, that technologies like HTTP/2, GZIP, caching, service workers, and other performance enhancing technologies are being used to deliver a better experience. The developer should make any and all attempts to get these scores as high as possible. Code should not be shipped under a 50%, heavily reviewed if below 60%, moderately reviewed if below 70%, and lightly reviewed if below 85%.

The second check for anything implemented in a product is for accessibility. Now that the feature has been proven to work well, ensure that the feature is able to be used by a person regardless of their abilities or needs. The tool for doing accessibility checks is called [Wave WebAIM](https://wave.webaim.org/). There are no exceptions to this check and anything below a 100% pass rate is deemed an immediate failure. There are, however, exceptions where a check might not validate every aspect of accessibility. Thus, it is good to always keep [up-to-date on W3 best practices](https://www.w3.org/standards/webdesign/accessibility) as 100% pass does not mean that the experience for an exceptional user is enjoyable; 100% pass means that a product is acceptable, not enjoyable.

Third, a comprehensive browser test should be conducted. Testing suite browsers like [Blisk Testing Browser](https://blisk.io/download) give a good idea for how something __may__ look once complete, but the best check is using that device or browser exactly. While it is not possible to check every single device, attempt to test every major browser and the most common screen sizes for phone, tablet, hybrid, latptop, desktop, etc. Design with the lowest common denominator in mind and testing will be made much easier. While cutting-edge features are nice and userful, they must also have [polyfills](https://polyfill.io/v2/docs/) or fallbacks for devices and browsers that may not follow W3 specifications. To check support before a test, reference [Can I Use](https://caniuse.com/) which compiles identified bugs and issues and updates the latest support for features as well as stats on the impact or global useage. To directly test features, feel free to use [Can I Use's Testing Suite](https://tests.caniuse.com/) which runs a specifications check on the browser accessing the resource. The developer is also encouraged to use tools like [BrowserStack](https://www.browserstack.com/) which allows you to test your code on real-life devices housed off-site in a datacenter.

It is also a good idea to check in the Bootstrap Documentation as the Bootstrap Team regularly uncover bugs in browser render engines. Additionally, checking with [WebKit](https://bugs.webkit.org/describecomponents.cgi?product=WebKit), [Chromium Blink](https://bugs.chromium.org/p/chromium/issues/list), [FireFox](https://bugzilla.mozilla.org/describecomponents.cgi?product=Core), and [Edge](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/).

Of course, these reviews are ever-changing and require attention to detail. There are certainly steps to make a better product ship-ready and the above are a few recommendations on how to get the product to that point. Every project is different and project owners may request less or more depending on several factors.

#Files

The files below are organized by category (language and scope). There are some customizations to various packages, but most of that was avoided wherever possible to make the code more portable and less tied to its dependencies.

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
| _flex.scss            | (Deprecating in v1.1) Adds atomic utility flex class                            | SCSS      |
| _flyout.scss          | Flyout on the home slider customisations                                        | SCSS      |
| _footer.scss          | Positions the social icons for the footer (Deprecating the atomic text class)   | SCSS      |
| _global.scss          | Sets bordering systems and the inheritance of the box bordering                 | SCSS      |
| _grid.scss            | (Deprecating in v1.1) Functions for creating grid                               | SCSS      |
| _lightbox.scss        | Contains the actionable item triggered by the FAB                               | SCSS      |
| _navigation.scss      | Customisations to the CodyHouse/mega-site-navigation package                    | SCSS      |
| _padding.scss         | (Deprecating in v1.1) Custom atomics and functions for padding elements         | SCSS      |
| _reset.scss           | Adapted version of Eric Meyer's browser reset to set staging                    | SCSS      |
| _search.scss          | (Refactor in v1.1) Adds theming to the search area                              | SCSS      |
| _sharepoint.scss      | (Refactor in v1.1) Fixes broad selection in management console                  | SCSS      |
| _slider.scss          | (Refactor in v1.2) Import of the themepunch slider                              | SCSS      |
| _typography.scss      | (Deprecating/Refactor v1.2) Atomic utility for type margins, size, and color    | SCSS      |
| _variables.scss       | (Refactor v1.0) Variables for the application like breakpoints, fonts, colors   | SCSS      |
| compiled.min.css      | __DO NOT EDIT:__ Automatically compiled and minified styles for old browsers    | CSS       |
| compiled.min.css.map  | __DO NOT EDIT:__ Maps new browsers to SCSS imports                              | MAP       |
| raw.scss              | Master file where new extensions should be imported. NO DIRECT EDITING.         | SCSS      |

#Recap

The Rowan College applications are ever-changing and dynamic, but this guide should attempt to give a sense of direction when writing code and reviewing code. Feel free to use the links in the documentation to further gain insight into particular tools or methods, as this documentation does not attempt to teach the use of the tools in any detail.

If you discover a security vulnerability within code, please send an e-mail to the Division of Web & Portal via [web@rcgc.edu](mailto:web@rcgc.edu). All security vulnerabilities will be promptly addressed.