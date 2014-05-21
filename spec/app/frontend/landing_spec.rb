require 'spec_helper'

describe "landing pages" do
  it "loads the front page" do
    get "/"
    expect(last_response).to be_ok
    expect(last_response.body).to include "Learn to make games"
  end
end
