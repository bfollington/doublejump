class Course
  include Mongoid::Document
  include Mongoid::Timestamps # adds created_at and updated_at fields

  # field <name>, :type => <type>, :default => <value>
  field :title, :type => String
  field :slug, :type => String
  field :description, :type => String

  validates_presence_of :title, :message => "Supply a title for the course you ding-dong"
  validates_presence_of :slug, :message => "The slug gets filled in for you, just leave it there!"
  validates_presence_of :description, :message => "Put a description in doofus"

  # You can define indexes on documents using the index macro:
  # index :field <, :unique => true>

  # You can create a composite key in mongoid to replace the default id using the key macro:
  # key :field <, :another_field, :one_more ....>
end
