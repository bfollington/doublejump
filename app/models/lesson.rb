class Lesson
  include Mongoid::Document
  include Mongoid::Timestamps # adds created_at and updated_at fields

  # field <name>, :type => <type>, :default => <value>
  field :title, :type => String
  field :slug, :type => String
  field :description, :type => String

  validates_presence_of :title, :message => "PUT IN A TITLE!"
  validates_presence_of :slug, :message => "The slug gets filled in for you, just leave it there!"
  validates_presence_of :description, :message => "You need a freakin' description dude"
  validates_uniqueness_of :title
  validates_uniqueness_of :slug

  has_and_belongs_to_many :courses
  has_and_belongs_to_many :steps
  belongs_to :account
  has_and_belongs_to_many :related_readings

  index({ slug: 1 }, { unique: true, name: "slug_index" })

  def get_step_index(current_step)
    step_ids.index(current_step.id)
  end

  def get_first_step
    Step.find( step_ids[0] )
  end

  def get_last_step
    Step.find( step_ids[step_ids.length - 1] )
  end

  def get_next_step(current_step)
    current_index = step_ids.index(current_step.id)

    if (step_ids.length > current_index + 1)
      Step.find( step_ids[current_index + 1] )
    else
      nil
    end
  end

  def get_prev_step(current_step)
    current_index = step_ids.index(current_step.id)

    if (current_index - 1 >= 0)
      Step.find( step_ids[current_index - 1] )
    else
      nil
    end
  end

  def get_steps_in_order
    result = []

    step_ids.each do |step_id|
      result << Step.find(step_id)
    end

    result
  end

  # You can define indexes on documents using the index macro:
  # index :field <, :unique => true>

  # You can create a composite key in mongoid to replace the default id using the key macro:
  # key :field <, :another_field, :one_more ....>
end
