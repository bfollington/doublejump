class SharedImage
  include Mongoid::Document
  include Mongoid::Timestamps # adds created_at and updated_at fields

  # field <name>, :type => <type>, :default => <value>
  field :url, :type => String
  field :description, :type => String
  field :likes, :type => Integer

  validates_format_of :url, with: /\A(https?|ftp):\/\/[^\s\/$\.\?#]+\.[^\s]+\z/, message: "Must be a valid URL"
  validates_presence_of :description, message: "Description is required!"
  validates_presence_of :url, message: "No point of making a reading without a link..."

  belongs_to :account
  belongs_to :step
  has_many :comments

  # You can define indexes on documents using the index macro:
  # index :field <, :unique => true>

  # You can create a composite key in mongoid to replace the default id using the key macro:
  # key :field <, :another_field, :one_more ....>
end
