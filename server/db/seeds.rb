# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Example:
#
#   Person.create(first_name: 'Eric', last_name: 'Kelly')

jobs_attrs = [
  {
    title: 'Javascripter',
    company: 'Tilde',
    description: 'You will write Javascripz',
    location: 'Portland, OR',
    category: 'internship'
  }, {
    title: 'Junior Ember Developer',
    company: 'Github',
    description: 'Get paid to learn Ember!',
    location: 'Boston, MA',
    category: 'part-time'
  }, {
    title: 'Senior Ember Developer',
    company: 'Github',
    description: 'Somebody to tell Jason how to build things.',
    location: 'New York City, NY',
    category: 'full-time'
  }
]

jobs_attrs.each do |attrs|
  Job.find_or_create_by(attrs)
end
