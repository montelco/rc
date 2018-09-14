#`_content.scss`
```
Version 1.0
Last Updated: September 13, 2018
Created by: Cory Monteleone
```
***
##Using the Content File
###Warning: This file has been deprecated and is slated for deletion.

This file, was deprecated in an alpha version of the codebase and only has a single declaration. It may be refactored and removed as an independent file in version 1.1. However, below are the use instructions.

```
header + main {
  background: $white;
}
```

Any `main` tag that follows after the `header` element will automatically have a white background. This comes as a result of the body having a blue background for touch users that can overscroll and thus should see a blue background. This, however, causes the areas included in it to have the same. The above fixes that by setting things back to the application's definition of white.