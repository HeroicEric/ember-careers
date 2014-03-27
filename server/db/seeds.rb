# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Example:
#
#   Person.create(first_name: 'Eric', last_name: 'Kelly')

jobs_attrs = [
  {
    title: 'Javascripter',
    company: 'JzJavascriptz',
    description: 'You will write Javascripz'
  }, {
    title: 'Junior Ember Developer',
    company: 'Firecracker',
    description: 'Help med students learn better'
  }, {
    title: 'Senior Ember Developer',
    company: 'Firecracker',
    description: 'Somebody to tell Jason how to build things.'
  }
]

jobs_attrs.each do |attrs|
  Job.find_or_create_by(attrs)
end
