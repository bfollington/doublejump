class StartedCourse
  include Mongoid::Document
  include Mongoid::Timestamps # adds created_at and updated_at fields

  # field <name>, :type => <type>, :default => <value>
  # We track where a user is up to in a given course etc.
  belongs_to :account, inverse_of: nil
  belongs_to :course, inverse_of: nil
  belongs_to :lesson, inverse_of: nil
  belongs_to :step, inverse_of: nil

  # You can define indexes on documents using the index macro:
  # index :field <, :unique => true>

  # You can create a composite key in mongoid to replace the default id using the key macro:
  # key :field <, :another_field, :one_more ....>
end
