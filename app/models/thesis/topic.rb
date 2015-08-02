class Topic
  include Mongoid::Document
  include Mongoid::Timestamps # adds created_at and updated_at fields

  field :name, :type => String

  has_and_belongs_to_many :learning_modules
  has_many :topic_scores

  validates_presence_of :name
  validates_uniqueness_of :name
end
