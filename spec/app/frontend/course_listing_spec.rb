require 'spec_helper'

describe "course listing page" do
  it "loads the list" do
    get "/"
    expect(last_response).to be_ok
  end
end
