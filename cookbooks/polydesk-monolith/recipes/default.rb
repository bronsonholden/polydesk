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
