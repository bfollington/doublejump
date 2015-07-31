class Content

  include Mongoid::Document
  include Mongoid::Timestamps # adds created_at and updated_at fields

  has_and_belongs_to_many :steps
  embeds_many :comments

  def get_type
    self["_type"]
  end

end
