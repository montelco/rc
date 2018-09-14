#`_corev15.scss`
```
Version 1.0
Last Updated: September 12, 2018
Created by: Cory Monteleone
```
***
##Using the Corev15 File

The corev15 file is an import of the default SharePoint styles in SharePoint 2013. The reason for importing this is to allow for Sharepoint styles to apply, but only as included. There is a script that runs on the SharePoint version of this template that strips out the default styles and is instead replaced with this version, which is not given global access to things. As a result of this, the styles seen in the local development server are identical to those on the SharePoint templated production version. The script, `js/corev15.js`, only allows the styles to be placed on the page globally in edit mode since
there are template elements which are outside of the control panel adversely affected by the sandboxing. This file, of course, should be removed if another CMS is used.