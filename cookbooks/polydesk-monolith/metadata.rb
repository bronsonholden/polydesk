name 'polydesk-monolith'
maintainer 'Paul Holden'
maintainer_email 'paulholden2@gmail.com'
license 'All Rights Reserved'
description 'Installs/Configures polydesk-monolith'
long_description 'Installs/Configures polydesk-monolith'
version '0.1.0'
chef_version '>= 12.14' if respond_to?(:chef_version)
depends 'nginx', '~> 8.1.5'
depends 'nodejs', '~> 5.0.0'
depends 'git', '~> 9.0.1'

# The `issues_url` points to the location where issues for this cookbook are
# tracked.  A `View Issues` link will be displayed on this cookbook's page when
# uploaded to a Supermarket.
#
# issues_url 'https://github.com/<insert_org_here>/polydesk-monolith/issues'

# The `source_url` points to the development repository for this cookbook.  A
# `View Source` link will be displayed on this cookbook's page when uploaded to
# a Supermarket.
#
# source_url 'https://github.com/<insert_org_here>/polydesk-monolith'
