class Metadata
  include Mongoid::Document
  include Mongoid::Timestamps # adds created_at and updated_at fields

  field :key, :type => String
  field :value, :type => String

  belongs_to :project

  validates_presence_of :key
  validates_uniqueness_of :key
  validates_presence_of :value
end
