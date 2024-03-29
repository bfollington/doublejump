class Project
  include Mongoid::Document
  include Mongoid::Timestamps # adds created_at and updated_at fields

  field :title, :type => String
  field :slug, :type => String

  has_and_belongs_to_many :learning_modules
  belongs_to :account
  has_many :metadatas
  has_many :topic_scores

  validates_presence_of :title
  validates_presence_of :slug
  validates_uniqueness_of :title
  validates_uniqueness_of :slug
end
