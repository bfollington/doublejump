class Topic
  include Mongoid::Document
  include Mongoid::Timestamps # adds created_at and updated_at fields

  field :name, :type => String
  field :key_name, :type => String

  attr_readonly :key_name

  def key_name
    name.squish.downcase.tr(" ","_")
  end

  has_and_belongs_to_many :learning_modules
  has_many :topic_scores

  validates_presence_of :name
  validates_uniqueness_of :name
end
