#`_flex.scss`
```
Version 1.0
Last Updated: October 14, 2018
Created by: Cory Monteleone
```
***
##Using the Flex File

This file is in process of being deprecated, but will have a functional replacement making references to it vestigal. The function of the file is to extend functionality of the Flex property to objects as needed.

```
.flex{
  &-xs{@media (max-width: $sm){flex: 1;}}
  &-sm{@media (max-width: $mm){flex: 1;}}
  &-md{@media (min-width: $md){flex: 1;}}
  &-lg{@media (min-width: $lg){flex: 1;}}
}

```

This block, awaiting refactor, allows for the elements on a page, at various application breakpoints to be altered into a flexible growth and shrink reflow. The original intent was to create columns of equal height at the desktop size.
