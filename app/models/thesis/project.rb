class Project
  include Mongoid::Document
  include Mongoid::Timestamps # adds created_at and updated_at fields

  field :title, :type => String
  field :slug, :type => String

  has_one :last_module, class_name: "LearningModule"
  has_and_belongs_to_many :learning_modules
  belongs_to :account, inverse_of: "projects"
  has_many :metadatas
  has_many :topic_scores

  validates_presence_of :title
  validates_presence_of :slug
  validates_uniqueness_of :slug

  def to_hash
    {
      id: _id.to_s,
      title: title,
      slug: slug,
      metadata: get_metadata_hash
    }
  end

  def get_metadata_hash
    data = {}

    metadatas.each do |metadata|
      data[metadata.key] = metadata.value
    end

    data
  end
end
