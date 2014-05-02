class RelatedReading
  include Mongoid::Document
  include Mongoid::Timestamps # adds created_at and updated_at fields

  # field <name>, :type => <type>, :default => <value>
  field :title, :type => String
  field :link, :type => String

  validates_format_of :link, with: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, message: "Must be a valid URL"
  validates_presence_of :title, message: "Title is required!"
  validates_presence_of :link, message: "No point of making a reading without a link..."

  has_and_belongs_to_many :lessons

  # You can define indexes on documents using the index macro:
  # index :field <, :unique => true>

  # You can create a composite key in mongoid to replace the default id using the key macro:
  # key :field <, :another_field, :one_more ....>
end
