#
# Cookbook:: polydesk-monolith
# Recipe:: default
#
# Copyright:: 2018, The Authors, All Rights Reserved.

apt_update 'Update the apt cache daily' do
  frequency 86_400
  action :periodic
end

include_recipe 'nginx'

template "#{node['nginx']['dir']}/sites-available/polydesk.io" do
  source 'polydesk.io.erb'
  owner 'root'
  group 'root'
  mode '0644'
end

directory "#{node['polydesk']['ssl_dir']}" do
  owner 'root'
  group 'root'
  mode '0755'
  action :create
end

cookbook_file "#{node['polydesk']['ssl_dir']}/certificate.crt" do
  owner 'root'
  group 'root'
  mode '0644'
end

cookbook_file "#{node['polydesk']['ssl_dir']}/private.key" do
  owner 'root'
  group 'root'
  mode '0644'
end

nginx_site 'polydesk.io' do
  enable true
end

nginx_site 'default' do
  enable false
end

include_recipe 'git'

git_client 'default' do
  action :install
end

directory "#{node['polydesk']['project_dir']}" do
  owner 'root'
  group 'root'
  mode '0644'
  recursive true
  action :create
end

git "#{node['polydesk']['project_dir']}" do
  repository 'https://github.com/paulholden2/polydesk'
  checkout_branch 'master'
end

include_recipe 'nodejs'
include_recipe 'nodejs::npm'

node.default['nodejs']['version'] = '10.10.0'
