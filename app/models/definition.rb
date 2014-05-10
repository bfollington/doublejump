class Definition
  include Mongoid::Document
  include Mongoid::Timestamps # adds created_at and updated_at fields

  field :title, :type => String
  field :search_title, :type => String
  field :body, :type => String

  validates_presence_of :title, message: "Title is required!"
  validates_presence_of :search_title, message: "Search title is required!"
  validates_presence_of :body, message: "Definition body is required!"

  validates_uniqueness_of :search_title, message: "Search title must be unique"

  validates_format_of :search_title, with: /\b[a-z0-9]+\b/, message: "Must be a lower case title."

  index({ search_title: 1 }, { unique: true, name: "slug_index" })

end
