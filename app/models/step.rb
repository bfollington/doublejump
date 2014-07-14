class Step
  include Mongoid::Document
  include Mongoid::Timestamps # adds created_at and updated_at fields

  # field <name>, :type => <type>, :default => <value>
  field :title, :type => String
  field :slug, :type => String
  field :body, :type => String
  field :is_sharing_step, :type => Boolean
  field :experience, :type => Integer, :default => 50

  validates_presence_of :title, :message => "Steps need titles too..."
  validates_presence_of :slug, :message => "The slug gets filled in for you, just leave it there!"
  validates_presence_of :body, :message => "You can't have an empty step, that makes no sense."
  validates_uniqueness_of :title
  validates_uniqueness_of :slug

  has_and_belongs_to_many :lessons
  has_many :comments
  belongs_to :account
  has_many :completed_steps
  has_many :shared_images

  index({ slug: 1 }, { unique: true, name: "slug_index" })

  def self.id_regex
    /(\_\{[A-z0-9]+\}\_)+/
  end

  def self.macro_regex
    /(\{[ ]*([A-z0-9\-]+)\{(((,\s+)*\"[A-z0-9, \r\n\*_\/\|\(\)\-\+\>\<\`\#\=\$\.\{\}\&\^\!\?\$\@\;\'\:]+\")*)\}[ \n]*\})+/
  end

  # You can define indexes on documents using the index macro:
  # index :field <, :unique => true>

  # You can create a composite key in mongoid to replace the default id using the key macro:
  # key :field <, :another_field, :one_more ....>
end
