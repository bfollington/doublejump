class Comment
  include Mongoid::Document
  include Mongoid::Timestamps # adds created_at and updated_at fields

  # field <name>, :type => <type>, :default => <value>
  field :body, :type => String
  field :upvotes, :type => Integer
  field :group, :type => Integer

  validates_presence_of :group, :message => "A comment has to belong to something, supply a group."
  validates_length_of   :body, :minimum => 20, :message => "That comment's pretty short, write some more maybe?"

  belongs_to :account
  embedded_in :step
  embedded_in :comment
  embeds_many :comments

  # You can define indexes on documents using the index macro:
  # index :field <, :unique => true>

  # You can create a composite key in mongoid to replace the default id using the key macro:
  # key :field <, :another_field, :one_more ....>
end
