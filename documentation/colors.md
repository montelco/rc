#`_colors.scss`
```
Version 1.0
Last Updated: September 13, 2018
Created by: Cory Monteleone
```
***
##Using the Colors File

This file, deprecating in v1.2 and refactored and moved in v1.5, provides an atomic utility file for assigning colors to varying scopes. In the v1.5 version, colors will be moved to `functions` and will be refactored to dynamically use application environment variables to create globally available atomic utilities.


```

.yellow {
  background: $yellow;
}

```

A background can be set using the corresponding class. Usually the variable name will match the class name, but this is not required. 

__Note that in v1.5 backgrounds will be formatted as `color-bg-{name}{-shade = null}` where `{shade}` is a three digit value between 000 and 900, incremented by 100 with the default (500) being accessible without the shade suffix (eg: `.color-bg-yellow-100`, `.color-bg-yellow`).__

```

.textYellow {
  color: $yellow;
}

```

A text color can be set using the corresponding class. Usually the variable name will match the class name, but this is not required. 

__Note that in v1.5 text color will be formatted as `color-text-{name}{-shade = null}` where `{shade}` is a three digit value between 000 and 900, incremented by 100 with the default (500) being accessible without the shade suffix (eg: `.color-text-yellow-100`, `.color-text-yellow`).__