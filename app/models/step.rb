class Step
  include Mongoid::Document
  include Mongoid::Timestamps # adds created_at and updated_at fields

  # field <name>, :type => <type>, :default => <value>
  field :title, :type => String
  field :slug, :type => String
  field :body, :type => String

  validates_presence_of :title, :message => "Steps need titles too..."
  validates_presence_of :body, :message => "You can't have an empty step, that makes no sense."

  has_and_belongs_to_many :lessons

  # You can define indexes on documents using the index macro:
  # index :field <, :unique => true>

  # You can create a composite key in mongoid to replace the default id using the key macro:
  # key :field <, :another_field, :one_more ....>
end
