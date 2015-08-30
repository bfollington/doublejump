require_relative "../_helpers"

class LearningModule
  include Mongoid::Document
  include Mongoid::Timestamps # adds created_at and updated_at fields

  field :title, :type => String
  field :slug, :type => String
  field :url, :type => String
  field :external, :type => Boolean

  belongs_to :account
  has_and_belongs_to_many :projects
  has_and_belongs_to_many :topics
  has_and_belongs_to_many :contents

  validates_presence_of :title
  validates_presence_of :slug
  validates_uniqueness_of :title
  validates_uniqueness_of :slug

  def get_contents_in_order
    result = []

    content_ids.each do |content_id|
      result << Content.find(content_id)
    end

    result
  end

  def to_hash
    {
      id: _id.to_s,
      title: title,
      slug: slug,
      url: url,
      external: external,
      topics: ModelHelpers.flatten_id_array(topic_ids),
      contents: ModelHelpers.flatten_id_array(content_ids),
      owner: account_id
    }
  end

  def from_hash(data)
    update_attributes!({
      title: data["title"],
      slug: data["slug"],
      url: data["url"],
      external: data["external"],
      topic_ids: data["topics"],
      content_ids: data["contents"],
      account_id: data["owner"],
    })
  end
end
